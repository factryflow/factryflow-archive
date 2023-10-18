# schemas.py


from datetime import time

from ninja import Schema
from pydantic import BaseModel, root_validator
from pydantic.types import conint

from api.schemas.base import WeeklyShiftTemplateBaseOut


class Detail(BaseModel):
    day_of_week: conint(ge=0, le=6)  # ensures the integer is between 0 and 6
    start_time: str
    end_time: str

    @root_validator
    def validate_times(cls, values):
        start_str = values["start_time"]
        end_str = values["end_time"]

        try:
            start_time_obj = time.fromisoformat(start_str)
            end_time_obj = time.fromisoformat(end_str)
        except ValueError:
            raise ValueError("Invalid time format")

        if start_time_obj >= end_time_obj:
            raise ValueError("start_time must be before end_time")

        # No need to convert back to string here; just return the values as they were
        return values


class WeeklyShiftTemplateIn(Schema):
    """
    This schema is using for getting the input data for the WeeklyShiftTemplate model.
    """
    name: str
    details: list[Detail] = None

    @root_validator(pre=True)
    def sort_and_validate_overlaps(cls, values):
        details = values.get("details")

        # Convert the string representations to time objects for comparisons.
        for detail in details:
            detail["start_time"] = time.fromisoformat(detail["start_time"])
            detail["end_time"] = time.fromisoformat(detail["end_time"])

        # Sort details by day_of_week and start_time
        sorted_details = sorted(
            details, key=lambda x: (x["day_of_week"], x["start_time"])
        )

        # Check for overlaps
        for i in range(len(sorted_details) - 1):
            if (
                sorted_details[i]["day_of_week"] == sorted_details[i + 1]["day_of_week"]
                and sorted_details[i]["end_time"] > sorted_details[i + 1]["start_time"]
            ):
                raise ValueError(
                    f"Overlapping times for day {sorted_details[i]['day_of_week']}"
                )

        # Convert the time objects back to their string representation.
        for detail in sorted_details:
            detail["start_time"] = detail["start_time"].strftime("%H:%M")
            detail["end_time"] = detail["end_time"].strftime("%H:%M")

        values["details"] = sorted_details
        return values


class WeeklyShiftTemplateOut(WeeklyShiftTemplateBaseOut):
    pass
