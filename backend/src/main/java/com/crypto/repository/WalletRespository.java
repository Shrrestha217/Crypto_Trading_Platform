package com.crypto.repository;

import com.crypto.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRespository extends JpaRepository<Wallet, Long> {

    Wallet findByUserId(Long userId);
}
