# UVNETWARE_BACK

## Overview

UVNetware Backend is a **seat layout and seat management system** 
It provides APIs for creating seat layouts, managing events, tracking seat availability, and handling real-time seat locking.

The system is designed to support **high concurrency seat selection scenarios** using Redis and WebSockets.

---

# Architecture

The backend follows a **modular service-based architecture**:

Frontend (Seat Designer / Viewer)
↓
REST APIs (Express)
↓
Services (Business Logic)
↓
Database + Redis
↓
Real-time updates via WebSockets

---

# Core Modules

The backend consists of four main services.

---

## 1. Layout Service

Handles seat layout templates.

Responsibilities:

• Create seat layout templates (stadium, cinema, conference hall, etc.)
• Store seat coordinates and structure
• Provide layout data for events

Example:

```
STAGE

A1 A2 A3 A4
B1 B2 B3 B4
C1 C2 C3 C4
```

A layout is stored as JSON in the database.

---

## 2. Event Service

Manages events that use seat layouts.

Responsibilities:

• Create events
• Assign layouts to events
• Generate seats for each event

Example:

Event: IPL Match
Layout: Stadium Layout

When an event is created, the backend generates seats for that event.

---

## 3. Seat Service

Manages seat availability and seat status.

Responsibilities:

• Fetch seats for an event
• Track seat states (available, held, booked)
• Update seat status

Seat States:

• available
• held
• booked

---

## 4. Hold Service

Handles temporary seat locking using Redis.

Responsibilities:

• Lock seats when users select them
• Prevent multiple users selecting the same seat
• Automatically release locks after timeout

Example:

```
seat:12:A10 = locked
TTL = 300 seconds
```

If the user does not complete booking within the timeout, the seat becomes available again.

---

# Tech Stack

Backend Framework
• Node.js
• Express.js

Database
• PostgreSQL

Caching / Concurrency Control
• Redis

Realtime Updates
• Socket.io

---

# Folder Structure

```
backend/
│
├── src/
│
│   ├── config/
│   │       database.js
│   │       redis.js
│   │
│   ├── controllers/
│   │       eventController.js
│   │       holdController.js
│   │       layoutController.js
│   │       seatController.js
│   │
│   ├── services/
│   │       eventService.js
│   │       holdService.js
│   │       layoutService.js
│   │       seatService.js
│   │
│   ├── models/
│   │       Event.js
│   │       EventSeat.js
│   │       Layout.js
│   │
│   ├── routes/
│   │       eventRoutes.js
│   │       layoutRoutes.js
│   │       seatRoutes.js
│   │
│   ├── middlewares/
│   │       errorHandler.js
│   │       validation.js
│   │
│   ├── sockets/
│   │       seatSocket.js
│   │
│   ├── utils/
│   │       seatGenerator.js
│   │       seatLockManager.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── README.md
```

---

# Folder Responsibilities

## config/

Contains configuration files.

database.js
Handles PostgreSQL connection.

redis.js
Initializes Redis client used for seat locking.

---

## controllers/

Controllers handle HTTP requests and responses.

layoutController.js
Handles seat layout APIs.

eventController.js
Handles event creation and management.

seatController.js
Handles seat queries and seat status updates.

holdController.js
Handles seat locking and releasing.

---

## services/

Services contain the main business logic.

layoutService.js
Manages seat layout creation and retrieval.

eventService.js
Handles event creation and seat generation.

seatService.js
Manages seat availability.

holdService.js
Handles Redis seat locks.

---

## models/

Defines database schemas.

Layout.js
Stores seat layout templates.

Event.js
Represents events that use layouts.

EventSeat.js
Stores seat status for each event.

---

## routes/

Defines API routes.

layoutRoutes.js
Routes for layout management.

eventRoutes.js
Routes for event management.

seatRoutes.js
Routes for seat availability.

---

## middlewares/

Custom Express middleware.

errorHandler.js
Centralized API error handling.

validation.js
Request validation.

---

## sockets/

Handles real-time seat updates.

seatSocket.js
Broadcasts seat status updates to connected users.

---

## utils/

Utility functions used across the application.

seatGenerator.js
Generates seats for events based on layout templates.

seatLockManager.js
Manages Redis seat locks and expiration.

---

## app.js

Initializes the Express application.

Responsibilities:

• Register middleware
• Register routes
• Export the Express app

---

## server.js

Application entry point.

Responsibilities:

• Start Express server
• Connect database
• Initialize WebSocket server

---

# Real-Time Seat System

The system uses Redis and WebSockets to support concurrent seat selection.

Flow:

1. User selects a seat
2. Seat is locked in Redis
3. Other users receive real-time updates
4. Seat remains locked for a limited time
5. If booking completes, seat becomes booked
6. If timeout occurs, seat lock expires

---

# Development Workflow

1. Clone repository
2. Create feature branch
3. Implement module changes
4. Create Pull Request
5. Code review before merging

Direct commits to the `main` branch should be avoided.
