from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid

class Character(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    breathing: str
    rank: str
    image: str
    abilities: List[str]
    personality: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class CharacterCreate(BaseModel):
    name: str
    description: str
    breathing: str
    rank: str
    image: str
    abilities: List[str]
    personality: str

class BreathingTechnique(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    forms: List[str]
    users: List[str]
    color: str
    element: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class BreathingTechniqueCreate(BaseModel):
    name: str
    description: str
    forms: List[str]
    users: List[str]
    color: str
    element: str

class StoryArc(BaseModel):
    id: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    episodes: str
    key_events: List[str]
    image: str
    order: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

class StoryArcCreate(BaseModel):
    title: str
    description: str
    episodes: str
    key_events: List[str]
    image: str
    order: int