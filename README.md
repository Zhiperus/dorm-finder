# University Student Accommodation Tracker

A full-stack web application for managing university student accommodations, including dormitories, room assignments, applications, billing, and occupancy tracking.

## Tech Stack

### Backend

- **Runtime**: Bun
- **Framework**: Hono (API), SvelteKit (SSR)
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **DI**: Needle DI
- **Validation**: Zod + drizzle-zod

### Frontend

- **Framework**: SvelteKit
- **State Management**: TanStack Query (Svelte Query)
- **Styling**: TailwindCSS
- **Forms**: formsnap

## Project Structure

```
src/
├── lib/
│   ├── domains/           # Client-side API modules
│   │   ├── users/
│   │   ├── accommodations/
│   │   ├── rooms/
│   │   ├── applications/
│   │   ├── occupancy/
│   │   ├── billing/
│   │   ├── reports/
│   │   ├── notifications/
│   │   └── audit/
│   ├── server/            # Server-side modules
│   │   ├── accommodations/
│   │   ├── rooms/
│   │   ├── applications/
│   │   ├── occupancy/
│   │   ├── billing/
│   │   ├── reports/
│   │   ├── notifications/
│   │   ├── audit/
│   │   ├── users/
│   │   ├── sessions/
│   │   ├── common/
│   │   │   ├── config/
│   │   │   ├── factories/
│   │   │   ├── middleware/
│   │   │   └── utils/
│   │   ├── db/
│   │   ├── redis/
│   │   └── storage/
│   └── utils/
├── routes/
└── app.d.ts
```

## Architecture Patterns

### Server-Side (Hono + Drizzle)

Each module follows a **4-layer architecture**:

```
module-name/
├── module.schema.ts     # Drizzle table definitions (pgTable)
├── dto/
│   └── module.dto.ts   # Zod DTOs (createSelectSchema, createInsertSchema)
├── module.repository.ts # Database operations (extends DrizzleRepository)
├── module.service.ts   # Business logic (@injectable)
└── module.controller.ts # API routes (extends Controller)
```

#### Schema Definition (`module.schema.ts`)

```typescript
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { timestamps } from '../common/utils/drizzle';

export const tableNameTable = pgTable('table_name', {
    id: uuid('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    ...timestamps
});

export type TableName = typeof tableNameTable.$inferSelect;
export type TableNameId = TableName['id'] & { __brand: 'TableNameId' };
```

#### DTOs (`dto/module.dto.ts`)

```typescript
import { createSelectSchema, createInsertSchema } from 'drizzle-zod';
import { tableNameTable } from '../module.schema';

export const tableNameDto = createSelectSchema(tableNameTable);
export const createTableNameDto = createInsertSchema(tableNameTable);
export const updateTableNameDto = createSelectSchema(tableNameTable).partial();
```

#### Repository (`module.repository.ts`)

```typescript
import { inject } from '@needle_di/core';
import { DrizzleRepository } from '../common/factories/drizzle-repository.factory';
import { DB } from '../db/drizzle.service';
import { tableNameTable } from './module.schema';
import type { TableName, TableNameId } from './module.schema';

@injectable()
export class TableNameRepository extends DrizzleRepository(DB) {
    table = this.db.schema.tableNameTable;

    async findAll() {
        return this.db.select().from(this.table);
    }

    async findById(id: TableNameId) {
        return this.db.select().from(this.table).where(eq(this.table.id, id));
    }
}
```

#### Service (`module.service.ts`)

```typescript
import { inject, injectable } from '@needle_di/core';
import { TableNameRepository } from './table-name.repository';

@injectable()
export class TableNameService {
    constructor(private tableNameRepository = inject(TableNameRepository)) {}

    async getAll() {
        return this.tableNameRepository.findAll();
    }

    async getById(id: string) {
        return this.tableNameRepository.findById(id as TableNameId);
    }
}
```

#### Controller (`module.controller.ts`)

```typescript
import { inject, injectable } from '@needle_di/core';
import { Controller } from '../common/factories/controller.factory';
import { TableNameService } from './table-name.service';
import { createRoute, z } from '@hono/zod-openapi';
import { tableNameDto, createTableNameDto } from './dto/module.dto';

@injectable()
export class TableNameController extends Controller {
    constructor(private tableNameService = inject(TableNameService)) {
        super();
    }

    routes() {
        const app = this.controller;

        const getAllRoute = createRoute({
            method: 'get',
            path: '/api/module-name',
            responses: {
                200: z.array(tableNameDto)
            }
        });

        const createRoute = createRoute({
            method: 'post',
            path: '/api/module-name',
            request: {
                body: {
                    content: {
                        'application/json': { schema: createTableNameDto }
                    }
                }
            },
            responses: {
                201: tableNameDto
            }
        });

        return app
            .get('/api/module-name', async (c) => {
                const result = await this.tableNameService.getAll();
                return c.json(result);
            })
            .post('/api/module-name', async (c) => {
                const data = await c.req.json();
                const result = await this.tableNameService.create(data);
                return c.json(result, 201);
            });
    }
}
```

### Client-Side (TanStack Query)

Each domain module provides typed TanStack Query options:

```
domains/
└── module-name/
    ├── types.ts     # API type definitions
    └── api.ts       # TanstackRequestOptions module
```

#### Types (`types.ts`)

```typescript
import type { Api } from '$lib/utils/types';

export type ListItems = Api['module-name']['$get'];
export type GetItem = Api['module-name'][':id']['$get'];
export type CreateItem = Api['module-name']['$post'];
export type UpdateItem = Api['module-name'][':id']['$patch'];
export type DeleteItem = Api['module-name'][':id']['$delete'];
```

#### API Module (`api.ts`)

```typescript
import { parseClientResponse } from '$lib/utils/api';
import type { ApiMutation, ApiQuery } from '$lib/utils/types';
import { TanstackRequestOptions } from '../request-options';
import type { ListItems, GetItem, CreateItem, UpdateItem, DeleteItem } from './types';

export class ModuleNameModule extends TanstackRequestOptions {
    namespace = 'module-name';

    list(): ApiQuery<ListItems> {
        return {
            queryKey: [this.namespace],
            queryFn: async () => await this.api.moduleName.$get().then(parseClientResponse)
        };
    }

    get(id: string): ApiQuery<GetItem> {
        return {
            queryKey: [this.namespace, id],
            queryFn: async () =>
                await this.api.moduleName[':id'].$get({ param: { id } }).then(parseClientResponse)
        };
    }

    create(): ApiMutation<CreateItem> {
        return {
            mutationFn: async (data) =>
                await this.api.moduleName.$post(data).then(parseClientResponse)
        };
    }

    update(): ApiMutation<UpdateItem> {
        return {
            mutationFn: async (data) =>
                await this.api.moduleName[':id'].$patch(data).then(parseClientResponse)
        };
    }

    delete(): ApiMutation<DeleteItem> {
        return {
            mutationFn: async (data) =>
                await this.api.moduleName[':id'].$delete(data).then(parseClientResponse)
        };
    }
}
```

#### Usage in Svelte Components

```svelte
<script lang="ts">
    import { createQuery, createMutation } from '@tanstack/svelte-query';
    import { api } from '$lib/domains';

    const query = createQuery({
        ...api().moduleName.list()
    });

    const createMutation = createMutation({
        ...api().moduleName.create()
    });

    async function handleCreate(data: unknown) {
        $createMutation.mutate(data);
    }
</script>

{#if $query.isSuccess}
    {#each $query.data as item}
        <div>{item.name}</div>
    {/each}
{/if}
```

## Database Schema

### Enums

All enums are defined in their respective schema files:

```typescript
export const statusEnum = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED', 'WAITLISTED']);
export const typeEnum = pgEnum('type', ['VALUE1', 'VALUE2']);
```

### Tables

All tables include standard timestamp columns:

```typescript
const { createdAt, updatedAt } = timestamps;
```

### Schema Export

All schemas are re-exported from `src/lib/server/db/drizzle-schema.ts`:

```typescript
export * from '../accommodations/accommodations.schema';
export * from '../rooms/rooms.schema';
export * from '../applications/applications.schema';
// ... etc
```

## API Routes

All modules register routes under `/api/`:

| Module             | Endpoints                                                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Users**          | `/api/users/me` (GET, PATCH)                                                                                                                                                            |
| **Accommodations** | `/api/accommodations` (GET, POST), `/api/accommodations/:id` (GET, PATCH, DELETE)                                                                                                       |
| **Rooms**          | `/api/rooms` (GET, POST), `/api/rooms/:id` (GET, PATCH, DELETE)                                                                                                                         |
| **Applications**   | `/api/applications` (GET, POST), `/api/applications/:id` (GET, PATCH, DELETE), `/api/applications/:id/documents` (GET, POST, DELETE)                                                    |
| **Occupancy**      | `/api/occupancy` (GET, POST), `/api/occupancy/:id` (GET, PATCH, DELETE), `/api/occupancy/check-in` (POST), `/api/occupancy/check-out` (POST)                                            |
| **Billing**        | `/api/billing` (GET, POST), `/api/billing/:id` (GET, PATCH, DELETE), `/api/billing/:id/payments` (GET, POST), `/api/billing/summary` (GET), `/api/billing/student/:studentId` (GET)     |
| **Reports**        | `/api/reports/occupancy` (GET), `/api/reports/waitlist` (GET), `/api/reports/student-history` (POST), `/api/reports/revenue` (GET), `/api/reports/unpaid-fees` (GET)                    |
| **Notifications**  | `/api/notifications` (GET), `/api/notifications/:id` (GET, DELETE), `/api/notifications/:id/read` (POST), `/api/notifications/read-all` (POST), `/api/notifications/unread-count` (GET) |
| **Audit**          | `/api/audit` (GET), `/api/audit/:id` (GET), `/api/audit/export` (GET), `/api/audit/user/:userId` (GET), `/api/audit/entity/:entityType/:entityId` (GET)                                 |

## User Roles

| Role             | Description                                       |
| ---------------- | ------------------------------------------------- |
| **STUDENT**      | Primary end-user seeking accommodation            |
| **DORM_MANAGER** | Operational staff for specific housing facilities |
| **ADMIN**        | High-level administrator with full system access  |
| **GUEST**        | Temporary resident with limited access            |

## Adding a New Module

### 1. Create Server-Side Files

```bash
# Create directory structure
mkdir -p src/lib/server/module-name/dto
```

1. **Schema** (`src/lib/server/module-name/module-name.schema.ts`)
2. **DTOs** (`src/lib/server/module-name/dto/module-name.dto.ts`)
3. **Repository** (`src/lib/server/module-name/module-name.repository.ts`)
4. **Service** (`src/lib/server/module-name/module-name.service.ts`)
5. **Controller** (`src/lib/server/module-name/module-name.controller.ts`)

### 2. Update Database Schema

Add to `src/lib/server/db/drizzle-schema.ts`:

```typescript
export * from '../module-name/module-name.schema';
```

### 3. Register Controller

Update `src/lib/server/application.controller.ts`:

```typescript
import { ModuleNameController } from './module-name/module-name.controller';

@injectable()
export class ApplicationController extends Controller {
    constructor(private moduleNameController = inject(ModuleNameController)) {
        super();
    }

    registerControllers() {
        return (
            this.controller
                // ...
                .route('/', this.moduleNameController.routes())
        );
    }
}
```

### 4. Create Client-Side Domain Module

```bash
# Create directory
mkdir -p src/lib/domains/module-name
```

1. **Types** (`src/lib/domains/module-name/types.ts`)
2. **API** (`src/lib/domains/module-name/api.ts`)

### 5. Export from Domains Index

Update `src/lib/domains/index.ts`:

```typescript
import { ModuleNameModule } from './module-name/api';

class ApiModule extends TanstackRequestOptions {
    moduleName = new ModuleNameModule(this.opts);
}
```

## Development Commands

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Type checking
bun run check

# Database migrations
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio

# Linting
bun run lint

# Build for production
bun run build
```

## Environment Variables

```env
# Redis
REDIS_URL=redis://localhost:6379

# Session
SESSION_SECRET=your-secret-key

# Upload
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880
```

## Contributing

1. Create a feature branch (`git checkout -b feature/new-module`)
2. Follow the architecture patterns above
3. Add type definitions and DTOs
4. Run `bun run check` before committing
5. Submit a pull request

## Guidelines

- Use **Drizzle ORM** with `pgTable` for schemas
- Use **drizzle-zod** for DTOs (no custom Zod schemas)
- Use **Needle DI** for dependency injection
- Use **TanStack Query** for client-side data fetching
- Follow the 4-layer architecture (Repository → Service → Controller)
- Use **Hono** OpenAPI schemas for route definitions
- Include proper TypeScript types for all exports
