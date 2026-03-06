from pydantic import BaseModel, ConfigDict


class DoneResponse(BaseModel):
    id: int

    # class Config:
    #     orm_mode = True
    model_config = ConfigDict(from_attributes=True)
