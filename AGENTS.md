University Student Accommodation Tracker - User Agents & Roles

This document defines the user agents (actors) within the University Student Accommodation Tracker system, outlining their specific privileges, responsibilities, and workflows as defined in the project specifications.

1. Student

The primary end-users of the system seeking accommodation within the university or partner housing.

    Authentication:

        Log in using Google or UP Mail authentication.

Privileges:

    View Accommodations: Browse available housing options.

Application Management:

    Submit accommodation applications indicating preferred dormitory and room type.

Upload required documents (e.g., proof of enrollment).

View the status of applications (pending, approved, rejected, waitlisted).

View housing assignment status.

Financials: View billing and payment status.

Constraints:

    Applications must be submitted within the allowed application period.

2. Dormitory / Apartment Manager

Operational staff responsible for specific housing facilities, handling the initial layer of student interactions and facility management.

    Privileges:

        Application Processing (Initial Screening):

            View applications for their assigned dormitory.

Review applications and check room availability.

Provide initial approval or rejection of accommodation requests.

Occupancy Management:

    Assign rooms or bed spaces to students.

Manage occupancy records, including move-in and move-out tracking.

Report room availability issues.

3. Housing Administrator (Admin) / Landlord

High-level administrators with full system access, responsible for final decisions, system configuration, and reporting.

    Privileges:

        Final Authority:

            Grant final approval for accommodation applications.

Override room assignments if necessary.

System Management (CRUD):

    Manage dormitories and housing facilities (Name, Location, Type, Capacity, Assigned Managers).

Manage rooms and bed spaces (Number, Type, Capacity, Occupancy).

Manage student users and other system users.

Financials:

    Manage billing and payments.

Generate official documents such as assignment notices and billing statements.

Reporting:

    Generate summary and administrative reports.

Specific reports include occupancy rates, waiting lists, student history, revenue summaries, and unpaid fees.

4. Guest / Temporary Resident

A potential user class acknowledged in the system specifications.

    Role Status: Listed as a "Possible User Class".

    Privileges: Specific privileges are not explicitly detailed in the provided text, implying potential read-only access to availability or a limited subset of Student features.

System Agent (Automated Processes)

Background processes required to maintain data integrity and automation.

    Authentication: Secure authentication via UP Mail.

Logging: Maintain user activity logs for logins, applications, approvals, and updates.

Audit Trail: Track approvals and assignments.

Notifications: Notify students of status updates via email or system notifications.

Validation: Prevent overbooking of rooms.
