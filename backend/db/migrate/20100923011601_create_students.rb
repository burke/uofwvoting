class CreateStudents < ActiveRecord::Migration
  def self.up
    create_table :students do |t|
      t.string :firstName
      t.string :lastName
      t.string :number
      t.datetime :votedAt
    end
    add_index :students, :votedAt
  end

  def self.down
    drop_table :students
  end
end
