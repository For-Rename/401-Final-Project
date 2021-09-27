# User stories

## HR control employee's data

- As an HR (administrative), I want to be able to modify and view all employee’s data.

### Feature Tasks

- Hr Admin can choose which employee data to view/edit

- Show the options for all employees data

- Save any data changes.

### Acceptance Tests

 - GIVEN employee  WHEN logged in THEN Ensure that the employee approved by HR has access only to his/her data and it's successfully saved into the database.

## Modify data as an employee

- As a non-administrative (employee) user, I want to create and modify my own data but not other users' data.

### Feature Tasks

- Non-administrative (employee) users must log in first in order to have all services on their website.
- Show the options for different services, attendance request, vacation request, performance status, profile.
- Save any request created.

### Acceptance Tests

- GIVEN employee  WHEN logged in THEN the requests made are successfully saved into the database.


## User tracking requests

- As an employee, I want to be able to track my requests and check my application process.

### Feature Tasks

- as an authenticated employee must log in first in order to check his application status
- Save any request created.

### Acceptance Tests

- GIVEN logged an employee WHEN logged in THEN authenticated with the correct user profile and be able to see his/her status.

## Employee onboarding process

- As an employee, I want to be able to check my onboarding page, the team, and which department I belong to.

### Feature Tasks

- As an employee must log in first in order to check other pages and information
- Save any interaction that could be modified. 

### Acceptance Tests

 - GIVEN employee WHEN logged in THEN have access only to his/her team pages and information.


## Check in/out

- As an employee, I want to be able to check in once I am at the company and check out before leaving.

### Feature Tasks

- As an employee must log in first in order to check in/check out
- As an employee, I need to press a button in order to check in/out.
- Save any interaction that could be modified. 

### Acceptance Tests
 - GIVEN employee  WHEN  logged in THEN have access only to his/her page and perform this process.
