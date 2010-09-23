class StudentsController < ApplicationController
  
  respond_to :json
  
  def index
    @students = Student.all
    respond_with(@students)
  end 

  def show
    respond_with(@student = Student.find_by_id(params[:id]))
  end

  def update
    @student = Student.find_by_id(params[:id])
    @student.votedAt = params[:votedAt]
    @student.save
    respond_with(@student)
  end 
  
end 
