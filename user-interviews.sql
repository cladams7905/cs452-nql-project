-- Create database
CREATE DATABASE IF NOT EXISTS user_interviews;
USE user_interviews;

-- Table for participants
CREATE TABLE participants (
    participant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    affiliation VARCHAR(150),
    demographics JSON, -- optional: can store age, location, etc.
    notes TEXT
);

-- Table for meetings
CREATE TABLE meetings (
    meeting_id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(255) NOT NULL,
    meeting_datetime DATETIME,
    summary TEXT,
    meeting_type VARCHAR(100) -- e.g., Product Demo, Discovery Interview
);

-- Many-to-many: participants in a meeting
CREATE TABLE meeting_participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,
    participant_id INT,
    role_in_meeting VARCHAR(100), -- e.g., Presenter, Interviewer
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id),
    FOREIGN KEY (participant_id) REFERENCES participants(participant_id)
);

-- Table for major discussion points
CREATE TABLE discussion_points (
    point_id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,
    topic VARCHAR(255), -- e.g., Product Development, Marketing Strategy
    details TEXT,
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id)
);

-- Table for questions & answers discussed
CREATE TABLE questions (
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,
    asked_by INT, -- FK to participants
    question_text TEXT,
    answer_text TEXT,
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id),
    FOREIGN KEY (asked_by) REFERENCES participants(participant_id)
);

-- Table for action items (next steps)
CREATE TABLE action_items (
    action_id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,
    assigned_to INT, -- FK to participants
    description TEXT,
    due_date DATE,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id),
    FOREIGN KEY (assigned_to) REFERENCES participants(participant_id)
);

-- Table for products/tools mentioned
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT
);

-- Link products mentioned in a meeting
CREATE TABLE meeting_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meeting_id INT,
    product_id INT,
    context TEXT, -- e.g., Demo, Comparison to ClickFunnels
    FOREIGN KEY (meeting_id) REFERENCES meetings(meeting_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
