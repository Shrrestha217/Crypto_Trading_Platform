package com.crypto.service;

import com.crypto.domain.OrderType;
import com.crypto.model.Coin;
import com.crypto.model.Order;
import com.crypto.model.OrderItem;
import com.crypto.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
