import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from '../app';
import Example from '../database/models/ExampleModel';