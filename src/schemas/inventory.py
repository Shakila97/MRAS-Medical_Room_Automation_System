"""MRAS — Inventory & GRN Pydantic schemas"""
from datetime import datetime, date
from typing import Optional, List
from pydantic import BaseModel


class InventoryItemRead(BaseModel):
    id: int
    drug_id: int
    drug_name: str
    total_quantity: int
    reorder_level: int
    unit: str
    location: Optional[str] = None
    updated_at: datetime
    status: str = "ok"           # ok | low | critical

    model_config = {"from_attributes": True}


class ExpiryEntry(BaseModel):
    lot_id: int
    drug_name: str
    lot_no: str
    quantity: int
    expiry_date: date
    days_until_expiry: int
    fefo_rank: int

    model_config = {"from_attributes": True}


class GRNLotCreate(BaseModel):
    drug_id: int
    drug_name: str
    lot_no: str
    manufacturer: Optional[str] = None
    quantity: int
    expiry_date: date


class GRNLotRead(GRNLotCreate):
    id: int
    grn_id: int
    fefo_rank: int
    remaining_qty: int

    model_config = {"from_attributes": True}


class GRNCreate(BaseModel):
    po_number: Optional[str] = None
    supplier: Optional[str] = None
    notes: Optional[str] = None
    lots: List[GRNLotCreate] = []


class GRNRead(BaseModel):
    id: int
    po_number: Optional[str] = None
    supplier: Optional[str] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime
    posted_at: Optional[datetime] = None
    lots: List[GRNLotRead] = []

    model_config = {"from_attributes": True}


class QueuedRx(BaseModel):
    prescription_id: int
    patient_name: str
    doctor_name: str
    drug_count: int
    created_at: datetime
    status: str


class DispenseResult(BaseModel):
    prescription_id: int
    status: str
    dispensed_at: datetime
    message: str
