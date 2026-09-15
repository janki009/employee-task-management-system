CREATE DATABASE employee_task_manager;
USE employee_task_manager;

CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(255),
    employee_id INT,
    priority VARCHAR(20),
    status VARCHAR(30),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

INSERT INTO employees (name, email, department)
VALUES
('Aarav Sharma', 'aarav@example.com', 'IT'),
('Priya Singh', 'priya@example.com', 'HR');

INSERT INTO tasks (title, description, employee_id, priority, status)
VALUES
('Website Testing', 'Test login page', 1, 'High', 'Pending'),
('Update Documentation', 'Update project document', 2, 'Medium', 'Completed');
