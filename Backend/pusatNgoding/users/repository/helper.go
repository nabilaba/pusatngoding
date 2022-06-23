package helper

import "time"

// Date of birth (DOB)
func Dob(year, month, day int) time.Time {
	dob := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

	return dob
}

// 2001-08-22 (ultah zharonk)
// Agustus 30, 2001
