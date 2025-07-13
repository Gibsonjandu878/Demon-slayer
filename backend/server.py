from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from models import Character, CharacterCreate, BreathingTechnique, BreathingTechniqueCreate, StoryArc, StoryArcCreate
from database import init_db, characters_collection, breathing_techniques_collection, story_arcs_collection
from typing import List
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Demon Slayer API", description="API for Demon Slayer information")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Characters endpoints
@api_router.get("/characters", response_model=List[Character])
async def get_characters():
    """Get all characters"""
    try:
        characters = await characters_collection.find().to_list(1000)
        return [Character(**character) for character in characters]
    except Exception as e:
        logging.error(f"Error getting characters: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving characters")

@api_router.get("/characters/{character_id}", response_model=Character)
async def get_character(character_id: str):
    """Get a specific character by ID"""
    try:
        character = await characters_collection.find_one({"id": character_id})
        if character:
            return Character(**character)
        raise HTTPException(status_code=404, detail="Character not found")
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting character {character_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving character")

@api_router.post("/characters", response_model=Character)
async def create_character(character_data: CharacterCreate):
    """Create a new character"""
    try:
        character_dict = character_data.dict()
        character_obj = Character(**character_dict)
        await characters_collection.insert_one(character_obj.dict())
        return character_obj
    except Exception as e:
        logging.error(f"Error creating character: {e}")
        raise HTTPException(status_code=500, detail="Error creating character")

# Breathing Techniques endpoints
@api_router.get("/breathing-techniques", response_model=List[BreathingTechnique])
async def get_breathing_techniques():
    """Get all breathing techniques"""
    try:
        techniques = await breathing_techniques_collection.find().to_list(1000)
        return [BreathingTechnique(**technique) for technique in techniques]
    except Exception as e:
        logging.error(f"Error getting breathing techniques: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving breathing techniques")

@api_router.get("/breathing-techniques/{technique_id}", response_model=BreathingTechnique)
async def get_breathing_technique(technique_id: str):
    """Get a specific breathing technique by ID"""
    try:
        technique = await breathing_techniques_collection.find_one({"id": technique_id})
        if technique:
            return BreathingTechnique(**technique)
        raise HTTPException(status_code=404, detail="Breathing technique not found")
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting breathing technique {technique_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving breathing technique")

@api_router.post("/breathing-techniques", response_model=BreathingTechnique)
async def create_breathing_technique(technique_data: BreathingTechniqueCreate):
    """Create a new breathing technique"""
    try:
        technique_dict = technique_data.dict()
        technique_obj = BreathingTechnique(**technique_dict)
        await breathing_techniques_collection.insert_one(technique_obj.dict())
        return technique_obj
    except Exception as e:
        logging.error(f"Error creating breathing technique: {e}")
        raise HTTPException(status_code=500, detail="Error creating breathing technique")

# Story Arcs endpoints
@api_router.get("/story-arcs", response_model=List[StoryArc])
async def get_story_arcs():
    """Get all story arcs ordered by sequence"""
    try:
        arcs = await story_arcs_collection.find().sort("order", 1).to_list(1000)
        return [StoryArc(**arc) for arc in arcs]
    except Exception as e:
        logging.error(f"Error getting story arcs: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving story arcs")

@api_router.get("/story-arcs/{arc_id}", response_model=StoryArc)
async def get_story_arc(arc_id: str):
    """Get a specific story arc by ID"""
    try:
        arc = await story_arcs_collection.find_one({"id": arc_id})
        if arc:
            return StoryArc(**arc)
        raise HTTPException(status_code=404, detail="Story arc not found")
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error getting story arc {arc_id}: {e}")
        raise HTTPException(status_code=500, detail="Error retrieving story arc")

@api_router.post("/story-arcs", response_model=StoryArc)
async def create_story_arc(arc_data: StoryArcCreate):
    """Create a new story arc"""
    try:
        arc_dict = arc_data.dict()
        arc_obj = StoryArc(**arc_dict)
        await story_arcs_collection.insert_one(arc_obj.dict())
        return arc_obj
    except Exception as e:
        logging.error(f"Error creating story arc: {e}")
        raise HTTPException(status_code=500, detail="Error creating story arc")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Demon Slayer API is running!", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        await characters_collection.count_documents({})
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logging.error(f"Health check failed: {e}")
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "database": "disconnected", "error": str(e)}
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_db():
    """Initialize database on startup"""
    await init_db()
    logger.info("✅ Database initialized successfully")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("📦 Database connection closed")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)