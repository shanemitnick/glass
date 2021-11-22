from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, validators
from wtforms.validators import DataRequired

class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    zipcode = StringField('Zipcode', validators=[DataRequired(), validators.length(min=5, max=10)])

    password = PasswordField('Password', validators)

    submit = SubmitField('Submit')

