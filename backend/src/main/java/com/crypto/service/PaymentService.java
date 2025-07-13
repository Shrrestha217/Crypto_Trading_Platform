package com.crypto.service;

import com.crypto.domain.PaymentMethod;
import com.crypto.model.PaymentOrder;
import com.crypto.model.User;
import com.crypto.response.PaymentResponse;
import com.razorpay.Payment;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Payment fetchPayment(String paymentId) throws RazorpayException;

    Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;
}
