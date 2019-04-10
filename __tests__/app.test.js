'use strict';

const faker = require('faker');
jest.mock('fs');

const {read, uppercase, write} = require('../src/file.js');

describe('tests of app.js', () => {

    it('read() - when given a bad file, returns an error', () => {
        let file = 'bad.txt';
        return read(file)
          .then(data => {
            expect(data).toBeFalsy();
          })
          .catch(err => {
            expect(err).toBeDefined();
          });
      });
    
      it('read() - can read a file', () => {
        let file = 'test.txt';
    
        return read(file)
          .then(data => {
            expect(data).toBeDefined();
          })
          .catch(err => {
            expect(err).toBe('boom');
          });
      });
    
      it('read() - resolves when given a good file', () => {
        let file = 'file.txt';
        return expect(read(file)).resolves.toEqual(new Buffer('File Contents'));
      });

    
      it('uppercase() - can do uppercase', () => {
        let data = Buffer.from(faker.random.word());
        console.log(data);
        expect(uppercase(data)).toEqual(Buffer.from(data.toString().toUpperCase()));
      });
    
      it('write() - when given a bad file, returns an error', () => {
        let file = 'bad.txt';
        return write(file)
          .then(data => {
            expect(data).toBeFalsy();
          })
          .catch(err => {
            expect(err).toBeDefined();
          });
      });
    
    });