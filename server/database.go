// This file handles the MySQL database functionality
package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/go-sql-driver/mysql"
	_ "github.com/go-sql-driver/mysql"
)

// Set up the database and return the database instance
func setupDatabase() (*sql.DB, error) {
	// Access the environment variables
	user := os.Getenv("MYSQL_USER")
	password := os.Getenv("MYSQL_PASSWORD")
	dbName := os.Getenv("MYSQL_DB_NAME")

	// Get a database handle.
	cfg := mysql.Config{
		User:   user,
		Passwd: password,
		Net:    "tcp",
		Addr:   "127.0.0.1:3306",
		DBName: dbName,
	}

	// Access the mysql database
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		panic(err)

	}

	// Check if we are connected to the database
	pingErr := db.Ping()
	if pingErr != nil {
		log.Fatal(pingErr)
	}

	fmt.Println("Connected to database")

	// See "Important settings" section.
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return db, nil
}
