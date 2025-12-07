-- ============================================
-- Triply Database Migration Script
-- ============================================

-- 1. ALTER existing users table to add new columns
ALTER TABLE users 
ADD COLUMN email VARCHAR(150) UNIQUE AFTER username,
ADD COLUMN fullname VARCHAR(150) AFTER email,
ADD COLUMN profileimage VARCHAR(500) AFTER fullname,
ADD COLUMN createdat DATETIME DEFAULT CURRENT_TIMESTAMP AFTER profileimage,
ADD COLUMN isactive BOOLEAN DEFAULT TRUE AFTER lastaccess;

-- Update lastaccess to DATETIME type if it's currently VARCHAR
ALTER TABLE users 
MODIFY COLUMN lastaccess DATETIME;

-- Rename iduser to match convention (optional, keep if you prefer current name)
-- ALTER TABLE users CHANGE iduser iduser INT AUTO_INCREMENT;

-- ============================================
-- 2. Create trips table
-- ============================================
CREATE TABLE IF NOT EXISTS trips (
    idtrip INT AUTO_INCREMENT PRIMARY KEY,
    iduserowner INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    startdate DATE,
    enddate DATE,
    budget DECIMAL(10,2),
    coverimage VARCHAR(500),
    status ENUM('planning', 'confirmed', 'ongoing', 'completed', 'cancelled') DEFAULT 'planning',
    createdat DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedat DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (iduserowner) REFERENCES users(iduser) ON DELETE CASCADE,
    INDEX idx_user_trips (iduserowner),
    INDEX idx_trip_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. Create destinations table
-- ============================================
CREATE TABLE IF NOT EXISTS destinations (
    iddestination INT AUTO_INCREMENT PRIMARY KEY,
    idtrip INT NOT NULL,
    cityname VARCHAR(150) NOT NULL,
    countryname VARCHAR(150) NOT NULL,
    arrivaldate DATE,
    departuredate DATE,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    notes TEXT,
    displayorder INT DEFAULT 0,
    FOREIGN KEY (idtrip) REFERENCES trips(idtrip) ON DELETE CASCADE,
    INDEX idx_trip_destinations (idtrip)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. Create activities table
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
    idactivity INT AUTO_INCREMENT PRIMARY KEY,
    iddestination INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    activitydate DATE,
    starttime TIME,
    endtime TIME,
    location VARCHAR(300),
    cost DECIMAL(10,2),
    category ENUM('transport', 'accommodation', 'food', 'sightseeing', 'entertainment', 'other') DEFAULT 'other',
    iscompleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (iddestination) REFERENCES destinations(iddestination) ON DELETE CASCADE,
    INDEX idx_destination_activities (iddestination),
    INDEX idx_activity_date (activitydate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. Create tripparticipants table
-- ============================================
CREATE TABLE IF NOT EXISTS tripparticipants (
    idparticipant INT AUTO_INCREMENT PRIMARY KEY,
    idtrip INT NOT NULL,
    iduser INT NOT NULL,
    role ENUM('owner', 'editor', 'viewer') DEFAULT 'viewer',
    joinedat DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idtrip) REFERENCES trips(idtrip) ON DELETE CASCADE,
    FOREIGN KEY (iduser) REFERENCES users(iduser) ON DELETE CASCADE,
    UNIQUE KEY unique_trip_user (idtrip, iduser),
    INDEX idx_user_participations (iduser)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Verification queries
-- ============================================
-- SHOW TABLES;
-- DESCRIBE users;
-- DESCRIBE trips;
-- DESCRIBE destinations;
-- DESCRIBE activities;
-- DESCRIBE tripparticipants;
