class Student < ActiveRecord::Base

  validate :votedAt_cannot_be_reassigned
  
  def votedAt_cannot_be_reassigned
    if !votedAt_was.nil? and voted_at_changed?
      errors.add(:votedAt, "cannot be changed once it has already been set.")
    end 
  end 

end
