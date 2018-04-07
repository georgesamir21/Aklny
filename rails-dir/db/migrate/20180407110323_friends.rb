class Friends < ActiveRecord::Migration[5.1]
  def change
    create_table :friends, id: false do |t|
      t.integer "user_id"
      t.integer "friend_id"
    end
  end
end