# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :massages
- has_many :groups, through: :users_groups
- has_many :users_groups

## massagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|not: null, foreign_key: true|
|group_id|integer|not: null, foreign_key: true|
|image|string|
|body|text|

### Association
- belong_to :user
- belong_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null: false|

### Association
has_many :users, through: :uesrs_groups
has_many :users_groups
has_many :groups

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
