package com.crypto.service;

import com.crypto.model.Transaction;
import com.crypto.model.Wallet;
import com.crypto.domain.TransactionType;

import java.math.BigDecimal;
import java.util.List;

public interface TransactionService {

    Transaction createTransaction(Wallet wallet, TransactionType type, String description, BigDecimal amount);

    List<Transaction> getTransactionsForUser(Long userId);

    Transaction getTransactionById(Long id);

    List<Transaction> getAllTransactions();
}
