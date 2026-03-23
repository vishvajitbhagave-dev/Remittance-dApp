#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype,
    Address, Env, String, Vec, vec, Map,
};

#[contracttype]
pub enum DataKey {
    Transfer(u64),
    UserTxCount(Address),
    TotalTransfers,
    Admin,
}

#[contracttype]
#[derive(Clone)]
pub struct Transfer {
    pub sender:   Address,
    pub receiver: Address,
    pub amount:   i128,
    pub memo:     String,
    pub timestamp: u64,
}

#[contract]
pub struct RemitContract;

#[contractimpl]
impl RemitContract {
    pub fn init(env: Env, admin: Address) {
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TotalTransfers, &0u64);
    }

    // Record a transfer on-chain
    pub fn record_transfer(
        env: Env,
        sender: Address,
        receiver: Address,
        amount: i128,
        memo: String,
    ) -> u64 {
        sender.require_auth();

        let mut total: u64 = env.storage().instance()
            .get(&DataKey::TotalTransfers).unwrap_or(0u64);
        total += 1;
        env.storage().instance().set(&DataKey::TotalTransfers, &total);

        let transfer = Transfer {
            sender:    sender.clone(),
            receiver:  receiver.clone(),
            amount,
            memo,
            timestamp: env.ledger().timestamp(),
        };

        env.storage().instance().set(&DataKey::Transfer(total), &transfer);

        // Update user tx count
        let count: u64 = env.storage().instance()
            .get(&DataKey::UserTxCount(sender.clone())).unwrap_or(0u64);
        env.storage().instance().set(&DataKey::UserTxCount(sender), &(count + 1));

        total
    }

    pub fn get_total(env: Env) -> u64 {
        env.storage().instance().get(&DataKey::TotalTransfers).unwrap_or(0u64)
    }

    pub fn get_user_count(env: Env, user: Address) -> u64 {
        env.storage().instance().get(&DataKey::UserTxCount(user)).unwrap_or(0u64)
    }
}