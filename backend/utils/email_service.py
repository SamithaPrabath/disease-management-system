import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app

class EmailService:
    @staticmethod
    def send_welcome_email(recipient_email, name, username, role, password):
        """
        Send a welcome email to a newly registered user.
        
        Args:
            recipient_email (str): The recipient's email address
            name (str): The recipient's full name
            username (str): The recipient's username
            role (str): The role of the user (doctor, phi, institute, moh)
            password (str): The password of the user
        Returns:
            dict: A dictionary containing the status of the email sending operation
        """
        try:
            # Get email configuration from environment variables
            smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            sender_email = os.environ.get('EMAIL_USER')
            sender_password = os.environ.get('EMAIL_PASSWORD')
            
            # Check if email configuration is available
            if not sender_email or not sender_password:
                return {
                    "status": "error",
                    "message": "Email configuration not set in environment variables"
                }
            
            # Create message
            message = MIMEMultipart()
            message["From"] = sender_email
            message["To"] = recipient_email
            message["Subject"] = "Welcome to Health Sentinel System"
            
            # Email content
            role_display = role.upper() if role else "User"
            body = f"""
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #4a6fa5;">Welcome to Health Sentinel System!</h2>
                  <p>Dear {name},</p>
                  <p>Thank you for registering with our Health Sentinel System. Your account has been successfully created.</p>
                  <p><strong>Account Details:</strong></p>
                  <ul>
                    <li><strong>Username:</strong> {username}</li>
                    <li><strong>Role:</strong> {role_display}</li>
                    <li><strong>Password:</strong> {password}</li>
                  </ul>
                  <p>You can now log in to the system using your username and the password you provided during registration.</p>
                  <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                  <p>Best regards,<br>Health Sentinel Team</p>
                </div>
              </body>
            </html>
            """
            
            message.attach(MIMEText(body, "html"))
            
            # Connect to SMTP server and send email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(message)
            
            return {
                "status": "success",
                "message": f"Welcome email sent to {recipient_email}"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to send email: {str(e)}"
            }
            
    @staticmethod
    def send_password_reset_email(recipient_email, name, username, role, password):
        """
        Send a password reset email to a user.
        
        Args:
            recipient_email (str): The recipient's email address
            name (str): The recipient's full name
            username (str): The recipient's username
            role (str): The role of the user (doctor, phi, institute, moh)
            password (str): The reset password
        Returns:
            dict: A dictionary containing the status of the email sending operation
        """
        try:
            # Get email configuration from environment variables
            smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            sender_email = os.environ.get('EMAIL_USER')
            sender_password = os.environ.get('EMAIL_PASSWORD')
            
            # Check if email configuration is available
            if not sender_email or not sender_password:
                return {
                    "status": "error",
                    "message": "Email configuration not set in environment variables"
                }
            
            # Create message
            message = MIMEMultipart()
            message["From"] = sender_email
            message["To"] = recipient_email
            message["Subject"] = "Password Reset - Health Sentinel System"
            
            # Email content
            role_display = role.upper() if role else "User"
            body = f"""
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h2 style="color: #4a6fa5;">Password Reset - Health Sentinel System</h2>
                  <p>Dear {name},</p>
                  <p>Your password has been successfully reset as requested.</p>
                  <p><strong>Account Details:</strong></p>
                  <ul>
                    <li><strong>Username:</strong> {username}</li>
                    <li><strong>Role:</strong> {role_display}</li>
                    <li><strong>New Password:</strong> {password}</li>
                  </ul>
                  <p>You can now log in to the system using your username and this new password.</p>
                  <p>For security reasons, we recommend changing your password after logging in.</p>
                  <p>If you did not request this password reset, please contact our support team immediately.</p>
                  <p>Best regards,<br>Health Sentinel Team</p>
                </div>
              </body>
            </html>
            """
            
            message.attach(MIMEText(body, "html"))
            
            # Connect to SMTP server and send email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(message)
            
            return {
                "status": "success",
                "message": f"Password reset email sent to {recipient_email}"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to send password reset email: {str(e)}"
            }
            
    @staticmethod
    def send_email(recipient_email, subject, message_text):
        """
        Send a generic email with plain text content.
        
        Args:
            recipient_email (str): The recipient's email address
            subject (str): Email subject
            message_text (str): Plain text message content
            
        Returns:
            dict: A dictionary containing the status of the email sending operation
        """
        try:
            # Get email configuration from environment variables
            smtp_server = os.environ.get('SMTP_SERVER', 'smtp.gmail.com')
            smtp_port = int(os.environ.get('SMTP_PORT', 587))
            sender_email = os.environ.get('EMAIL_USER')
            sender_password = os.environ.get('EMAIL_PASSWORD')
            
            # Check if email configuration is available
            if not sender_email or not sender_password:
                return {
                    "status": "error",
                    "message": "Email configuration not set in environment variables"
                }
            
            # Create message
            message = MIMEMultipart()
            message["From"] = sender_email
            message["To"] = recipient_email
            message["Subject"] = subject
            
            # Attach plain text content
            message.attach(MIMEText(message_text, "plain"))
            
            # Connect to SMTP server and send email
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.send_message(message)
            
            return {
                "status": "success",
                "message": f"Email sent to {recipient_email}"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to send email: {str(e)}"
            } 