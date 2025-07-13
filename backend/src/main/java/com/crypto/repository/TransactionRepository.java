package com.crypto.repository;

import com.crypto.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByWalletUserIdOrderByTimestampDesc(Long userId);

    List<Transaction> findAllByOrderByTimestampDesc();
}
