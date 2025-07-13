package com.crypto.service.impl;

import com.crypto.domain.TransactionType;
import com.crypto.model.Transaction;
import com.crypto.model.Wallet;
import com.crypto.repository.TransactionRepository;
import com.crypto.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Wallet wallet, TransactionType type, String description, BigDecimal amount) {
        Transaction transaction = new Transaction();
        transaction.setWallet(wallet);
        transaction.setTransactionType(type);
        transaction.setDescription(description);
        transaction.setAmount(amount);
        transaction.setTimestamp(LocalDateTime.now());

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsForUser(Long userId) {
        return transactionRepository.findByWalletUserIdOrderByTimestampDesc(userId);
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByTimestampDesc();
    }
}
