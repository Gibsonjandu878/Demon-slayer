from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Collections
characters_collection = db.characters
breathing_techniques_collection = db.breathing_techniques
story_arcs_collection = db.story_arcs

async def init_db():
    """Initialize database with sample data if collections are empty"""
    
    # Sample characters data
    sample_characters = [
        {
            "id": "1",
            "name": "Tanjiro Kamado",
            "description": "A kind-hearted boy who became a demon slayer to turn his sister back to human and avenge his family.",
            "breathing": "Water Breathing & Sun Breathing",
            "rank": "Demon Slayer",
            "image": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
            "abilities": ["Enhanced Smell", "Hard Forehead", "Dance of Fire God"],
            "personality": "Compassionate, determined, empathetic"
        },
        {
            "id": "2",
            "name": "Nezuko Kamado",
            "description": "Tanjiro's sister who was turned into a demon but retained her humanity and fights alongside demon slayers.",
            "breathing": "Blood Demon Art",
            "rank": "Demon",
            "image": "https://images.unsplash.com/photo-1594736797933-d0e501ba2fe6?w=400&h=600&fit=crop",
            "abilities": ["Size Manipulation", "Pyrokinesis", "Enhanced Strength"],
            "personality": "Protective, caring, fierce when threatened"
        },
        {
            "id": "3",
            "name": "Zenitsu Agatsuma",
            "description": "A cowardly but talented swordsman who can only use his abilities when unconscious or in extreme fear.",
            "breathing": "Thunder Breathing",
            "rank": "Demon Slayer",
            "image": "https://images.unsplash.com/photo-1580477667995-2b94f8f4286f?w=400&h=600&fit=crop",
            "abilities": ["First Form Master", "Enhanced Hearing", "Lightning Speed"],
            "personality": "Cowardly, loyal, determined"
        },
        {
            "id": "4",
            "name": "Inosuke Hashibira",
            "description": "A wild and aggressive fighter raised by boars who wears a boar mask and dual-wields serrated swords.",
            "breathing": "Beast Breathing",
            "rank": "Demon Slayer",
            "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
            "abilities": ["Flexible Joints", "Enhanced Touch", "Dual Wielding"],
            "personality": "Hot-headed, competitive, surprisingly caring"
        },
        {
            "id": "5",
            "name": "Giyu Tomioka",
            "description": "The stoic Water Hashira who first encountered Tanjiro and Nezuko, setting their journey in motion.",
            "breathing": "Water Breathing",
            "rank": "Hashira",
            "image": "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop",
            "abilities": ["Dead Calm", "Enhanced Reflexes", "Master Swordsman"],
            "personality": "Reserved, duty-bound, secretly caring"
        },
        {
            "id": "6",
            "name": "Shinobu Kocho",
            "description": "The Insect Hashira who uses poison instead of cutting off demon heads due to her lack of physical strength.",
            "breathing": "Insect Breathing",
            "rank": "Hashira",
            "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
            "abilities": ["Poison Mastery", "Speed", "Medical Knowledge"],
            "personality": "Cheerful exterior, vengeful interior, intelligent"
        }
    ]

    # Sample breathing techniques data
    sample_breathing_techniques = [
        {
            "id": "1",
            "name": "Water Breathing",
            "description": "A breathing style that mimics water, specifically the flow, flexibility and adaptability of the liquid.",
            "forms": [
                "First Form: Water Surface Slash",
                "Second Form: Water Wheel",
                "Third Form: Flowing Dance",
                "Fourth Form: Striking Tide",
                "Fifth Form: Blessed Rain After the Drought"
            ],
            "users": ["Tanjiro Kamado", "Giyu Tomioka", "Urokodaki Sakonji"],
            "color": "blue",
            "element": "💧"
        },
        {
            "id": "2",
            "name": "Thunder Breathing",
            "description": "A breathing style that mimics lightning, specifically swift strikes and movements akin to thunder.",
            "forms": [
                "First Form: Thunderclap and Flash",
                "Second Form: Rice Spirit",
                "Third Form: Thunder Swarm",
                "Fourth Form: Distant Thunder",
                "Fifth Form: Heat Lightning"
            ],
            "users": ["Zenitsu Agatsuma", "Jigoro Kuwajima"],
            "color": "yellow",
            "element": "⚡"
        },
        {
            "id": "3",
            "name": "Beast Breathing",
            "description": "A self-taught breathing style created by Inosuke, mimicking the movements and instincts of wild beasts.",
            "forms": [
                "First Fang: Pierce",
                "Second Fang: Rip and Tear",
                "Third Fang: Devour",
                "Fourth Fang: Slice 'n' Dice",
                "Fifth Fang: Crazy Cutting"
            ],
            "users": ["Inosuke Hashibira"],
            "color": "brown",
            "element": "🐗"
        },
        {
            "id": "4",
            "name": "Insect Breathing",
            "description": "A breathing style derived from Flower Breathing, using thrusting and piercing attacks with poison.",
            "forms": [
                "Butterfly Dance: Caprice",
                "Dance of the Bee Sting: True Flutter",
                "Dance of the Dragonfly: Compound Eye Hexagon",
                "Dance of the Centipede: Hundred-Legged Zigzag"
            ],
            "users": ["Shinobu Kocho", "Kanao Tsuyuri"],
            "color": "purple",
            "element": "🦋"
        },
        {
            "id": "5",
            "name": "Sun Breathing",
            "description": "The original breathing style from which all other techniques derive, using the power of the sun.",
            "forms": [
                "Dance",
                "Clear Blue Sky",
                "Raging Sun",
                "Fake Rainbow",
                "Fire Wheel"
            ],
            "users": ["Yoriichi Tsugikuni", "Tanjiro Kamado"],
            "color": "red",
            "element": "☀️"
        }
    ]

    # Sample story arcs data
    sample_story_arcs = [
        {
            "id": "1",
            "title": "Final Selection Arc",
            "description": "Tanjiro undergoes grueling training and faces the Final Selection exam to become a demon slayer.",
            "episodes": "Episodes 1-5",
            "key_events": [
                "Tanjiro's family massacre",
                "Meeting Giyu Tomioka",
                "Training with Urokodaki",
                "Final Selection survival"
            ],
            "image": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
            "order": 1
        },
        {
            "id": "2",
            "title": "Kidnapper's Bog Arc",
            "description": "Tanjiro's first mission leads him to investigate mysterious disappearances in a small town.",
            "episodes": "Episodes 6-7",
            "key_events": [
                "First demon encounter",
                "Saving Kazumi's fiancée",
                "Learning about demon psychology",
                "Meeting the Hand Demon"
            ],
            "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
            "order": 2
        },
        {
            "id": "3",
            "title": "Asakusa Arc",
            "description": "In Tokyo, Tanjiro encounters Muzan Kibutsuji and learns more about the demon who killed his family.",
            "episodes": "Episodes 8-10",
            "key_events": [
                "First encounter with Muzan",
                "Meeting Tamayo and Yushiro",
                "Learning about demon transformation",
                "Nezuko's blood sample"
            ],
            "image": "https://images.unsplash.com/photo-1532968952-8c85f16cf50d?w=800&h=400&fit=crop",
            "order": 3
        },
        {
            "id": "4",
            "title": "Tsuzumi Mansion Arc",
            "description": "Tanjiro teams up with Zenitsu and Inosuke to investigate a mansion filled with demons.",
            "episodes": "Episodes 11-17",
            "key_events": [
                "Meeting Zenitsu and Inosuke",
                "Kyogai's Blood Demon Art",
                "Zenitsu's unconscious fighting",
                "Formation of the trio"
            ],
            "image": "https://images.unsplash.com/photo-1520637836862-4d197d17c207?w=800&h=400&fit=crop",
            "order": 4
        },
        {
            "id": "5",
            "title": "Mount Natagumo Arc",
            "description": "The trio faces the Lower Five Rui and his spider demon family in a deadly mountain battle.",
            "episodes": "Episodes 15-21",
            "key_events": [
                "Spider demon family",
                "Inosuke vs Mother Spider",
                "Tanjiro vs Rui",
                "Giyu and Shinobu's arrival",
                "Sun Breathing awakening"
            ],
            "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
            "order": 5
        },
        {
            "id": "6",
            "title": "Rehabilitation Training Arc",
            "description": "Recovery and training at the Butterfly Estate with the Hashira after the Mount Natagumo mission.",
            "episodes": "Episodes 22-26",
            "key_events": [
                "Meeting all Hashira",
                "Nezuko's trial",
                "Training with Kanao",
                "Total Concentration Breathing",
                "Preparing for future missions"
            ],
            "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop",
            "order": 6
        }
    ]

    # Initialize characters if collection is empty
    if await characters_collection.count_documents({}) == 0:
        await characters_collection.insert_many(sample_characters)
        print("✅ Initialized characters collection with sample data")

    # Initialize breathing techniques if collection is empty
    if await breathing_techniques_collection.count_documents({}) == 0:
        await breathing_techniques_collection.insert_many(sample_breathing_techniques)
        print("✅ Initialized breathing techniques collection with sample data")

    # Initialize story arcs if collection is empty
    if await story_arcs_collection.count_documents({}) == 0:
        await story_arcs_collection.insert_many(sample_story_arcs)
        print("✅ Initialized story arcs collection with sample data")