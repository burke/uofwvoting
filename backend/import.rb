require 'fastercsv'

Student.destroy_all
FasterCSV.open('students.csv').each do |row|
  Student.create!(:firstName => row[0], :lastName => 'Jones', :number => rand(900000))
end 

