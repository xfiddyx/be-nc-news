process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const client = require('../connection');
