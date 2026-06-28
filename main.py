from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data load karo
df = pd.read_csv("netflix_titles.csv")

# ── DATA CLEANING ──────────────────────────

# 1. Director — 29.91% missing → Unknown
df['director'] = df['director'].fillna('Unknown')

# 2. Cast — 9.37% missing → Not Available
df['cast'] = df['cast'].fillna('Not Available')

# 3. Country — 9.44% missing → Unknown
df['country'] = df['country'].fillna('Unknown')

# 4. Rating — 0.05% missing → Not Rated
df['rating'] = df['rating'].fillna('Not Rated')

# 5. Date added + Duration — Drop rows
df = df.dropna(subset=['date_added', 'duration'])

# 6. Whitespace clean karo
df['title']    = df['title'].str.strip()
df['director'] = df['director'].str.strip()
df['country']  = df['country'].str.strip()

# 7. Release year — int mein convert karo
df['release_year'] = df['release_year'].astype(int)

# ───────────────────────────────────────────

@app.get("/overview")
def get_overview():
    return {
        "total"   : len(df),
        "movies"  : len(df[df['type'] == 'Movie']),
        "tv_shows": len(df[df['type'] == 'TV Show'])
    }

@app.get("/genres")
def get_genres():
    genres = df['listed_in'].str.split(', ').explode()
    top_genres = genres.value_counts().head(10)
    return top_genres.reset_index().rename(
        columns={'listed_in': 'genre', 'count': 'count'}
    ).to_dict(orient='records')

@app.get("/years")
def get_years():
    year_data = df[df['release_year'] >= 2000]['release_year'].value_counts().sort_index()
    return year_data.reset_index().rename(
        columns={'release_year': 'year', 'count': 'count'}
    ).to_dict(orient='records')

@app.get("/countries")
def get_countries():
    countries = df['country'].dropna().str.split(', ').explode()
    top_countries = countries.value_counts().head(10)
    return top_countries.reset_index().rename(
        columns={'country': 'country', 'count': 'count'}
    ).to_dict(orient='records')

@app.get("/ratings")
def get_ratings():
    ratings = df['rating'].dropna().value_counts().head(8)
    return ratings.reset_index().rename(
        columns={'rating': 'rating', 'count': 'count'}
    ).to_dict(orient='records')

@app.get("/directors")
def get_directors():
    directors = df['director'].dropna()
    top_directors = directors.value_counts().head(10)
    return top_directors.reset_index().rename(
        columns={'director': 'director', 'count': 'count'}
    ).to_dict(orient='records')
    
    
@app.get("/data-quality")
def get_data_quality():
    return {
        "total_rows"        : len(df),
        "missing_values"    : df.isnull().sum().to_dict(),
        "duplicate_rows"    : int(df.duplicated().sum()),
        "null_percentage"   : (df.isnull().sum() / len(df) * 100).round(2).to_dict()
    }