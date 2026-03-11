from typing import Optional

from pydantic import BaseModel, Field

from pydantic import ConfigDict

class TaskBase(BaseModel):
    title: Optional[str] = Field(default=None, examples=["クリーニングを取りに行く"])


class TaskCreate(TaskBase):
    pass

class TaskCreateResponse(TaskCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)

class Task(TaskBase):
    id: int
    done: bool = Field(default=False, description="完了フラグ")

    model_config = ConfigDict(from_attributes=True)


