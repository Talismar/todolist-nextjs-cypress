from functools import lru_cache

from pydantic_settings import BaseSettings


class Configuration(BaseSettings):
    USER_TOKEN_FOR_RESET_DB: str


@lru_cache()
def get_settings():
    return Configuration(_env_file=(".env"))


configuration = get_settings()
