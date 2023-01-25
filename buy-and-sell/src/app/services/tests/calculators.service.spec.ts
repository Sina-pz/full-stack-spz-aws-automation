import { LoggerService } from './log.service';
import { CalculatorService } from './calculators.service';
import { TestBed } from '@angular/core/testing';
// unite test means we need to test a unite in complete isolation and because of that we are using mock version of dependencies; otherwise we were supposed to test CalculatorService, LoggerService and we could not call it unit test.
fdescribe('CalculatorService', () => {

  // calling dependencies multiple time is not efficient
  // SpyObj('LoggerService', ["log"]): spy on log method of that srv
  // creating complete fake version of dependencies: good for unit test
  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {

    // console.log("Calling beforeEach");
    // complete fake implementation
    loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
    // instead of calling dependencies explicitly it is better use angular TestBed for dep injection
    TestBed.configureTestingModule({
      providers: [
        // except this one other dependencies should be mock version
        // using dependency injection because it is how the whole app is design in angular
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    });
    // old => calculator = new CalculatorService(loggerSpy);
    calculator = TestBed.inject(CalculatorService);
  });

  fit('should add two numbers', () => {

    // console.log("add test");
    // loggerSpy.log.and.returnValue();
    // if log has return we can have access to tha for further usage
    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

  it('should subtract two numbers', () => {

    console.log("subtract test");

    const result = calculator.subtract(2, 2);

    expect(result).toBe(0, "unexpected subtraction result");

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

});
// xdescribe("CalculatorService", () => { => diasble this test
// fdescribe("CalculatorService", () => { => focus on this test suit