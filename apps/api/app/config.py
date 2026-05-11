from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Wellness Commerce API"
    app_env: str = "development"
    database_url: str = Field(
        default="postgresql+psycopg://postgres:postgres@localhost:5432/wellness_commerce"
    )
    cors_origins: list[str] = ["http://localhost:3000"]
    jwt_secret: str = "dev-secret-change-me-at-least-32-chars"
    jwt_algorithm: str = "HS256"
    jwt_exp_minutes: int = 60 * 12
    admin_seed_username: str = "admin"
    admin_seed_password: str = "admin123"

    model_config = SettingsConfigDict(env_file=".env", env_prefix="WELLNESS_")


settings = Settings()
