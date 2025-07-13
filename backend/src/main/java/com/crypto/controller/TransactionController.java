package com.crypto.controller;

import com.crypto.domain.USER_ROLE;
import com.crypto.model.User;
import com.crypto.model.Transaction;
import com.crypto.service.UserService;
import com.crypto.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    // 1. Get all transactions for the logged-in user
    @GetMapping
    public ResponseEntity<List<Transaction>> getUserTransactions(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        List<Transaction> transactions = transactionService.getTransactionsForUser(user.getId());

        return ResponseEntity.ok(transactions);
    }

    // 2. Get transaction by ID (only if it belongs to the logged-in user)
    @GetMapping("/{transactionId}")
    public ResponseEntity<Transaction> getTransactionById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long transactionId) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);
        Transaction transaction = transactionService.getTransactionById(transactionId);

        if (!transaction.getWallet().getUser().getId().equals(user.getId())) {
            throw new Exception("Unauthorized access to transaction.");
        }

        return ResponseEntity.ok(transaction);
    }

    // 3. [Optional] Admin: Get all transactions in the system
    @GetMapping("/admin/all")
    public ResponseEntity<List<Transaction>> getAllTransactions(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserProfileByJwt(jwt);

        // Optional: check if user is admin
        if (user.getRole() != USER_ROLE.ROLE_ADMIN) {
            throw new Exception("Access denied. Admins only.");
        }

        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }
}
