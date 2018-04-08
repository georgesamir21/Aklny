class UsersController < ApplicationController
    # before_action :authenticate_user,  only: [:auth]

    def register
        # password_digest
        uparams = params.permit(:name, :email, :password)
        # puts uparams
        @user = User.create(uparams)
        if User.find_by(email:uparams[:email])
            render json: { success: false, message:  User.find_by(email:uparams[:email])}
        elsif @user.save
            render json: { success: true, message: 'user added' }
        else
            render json: { success: false, message: @user.errors }
        end 
    end


    def add_friend
        # user_id = 5 #to be get from authentication
        @user = User.find(params[:id].to_i);
        @friend = User.find_by(email: params[:email]);

        if @user.friends.include?(@friend)
            render json: {success: false, message: "already a friend"}
        elsif @friend != [] && params[:email] != @user.email && @friend
        	@user.friends << @friend
            render json: {success: true, message: @user.friends}
        else
            render json: {success: false, message: "Friend Not found"}
        end
    end            

    def del_friend
        # user_id = 5 #to be get from authentication
        @user = User.find(params[:id].to_i);
        @friend = User.find(params[:friend_id].to_i);

        if User.find(params[:id].to_i).friends.include?(@friend)
			@user.friends.delete(@friend)
            render json: {success: true, message: "friend deleted"}
        else
            render json: {error: true, message: @friend}
        end
    end
    
    def list_friends
        @friends = User.find(params[:id]).friends
        render json: {success: true, message: @friends}
    end

    def list_notifications
        user_id = params[:id]
        @join_notif=[]
        @invite_notif = []
        @myorders = User.find(user_id).orders.find_each do |order|
            order.notifications.where(notification_type: "join").order(created_at: :desc).each do |notif|
                user= User.where(id: notif.user_id).select(:id,:name)[0]
                @join_notif << {order_id: notif.order_id, user: user, created_at: notif.created_at}
            end
        end
        Notification.where(user_id: user_id).order(created_at: :desc).each do |notif|
            user = {name: Order.find(notif.order_id).user.name, id: Order.find(notif.order_id).user.id}
            @invite_notif << {order_id: notif.order_id, user: user, created_at: notif.created_at}
        end
        render json: {success: true, message: {join_notif: @join_notif, invite_notif: @invite_notif }}
    end

    def list_my_orders
        render json: User.find(params[:id]).orders
    end

    def list_joined_orders
        @joinedOrders = []
        Notification.where(user_id: params[:id], notification_type: "join").find_each do |notif|
            @joinedOrders << Order.find(notif.order_id)
        end
        render json: {success: true, message: @joinedOrders}
    end
end
