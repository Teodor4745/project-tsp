﻿namespace backend.DTO
{
    public class RegisterDTO
    {
        public required string Firstname { get; set; }
        public required string Lastname { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Phone { get; set; }
    }
}
