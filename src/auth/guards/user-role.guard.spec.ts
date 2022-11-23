import { UserRoleGuard } from './user-role.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, BadRequestException, ForbiddenException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { ValidRoles } from '../interfaces';

describe('UserRoleGuard', () => {
  let userRoleGuard:UserRoleGuard;

  beforeEach(()=>{
    userRoleGuard =  new UserRoleGuard(new Reflector);
  })
  it('should be defined', () => {
    expect(userRoleGuard).toBeDefined();
  });

  it('should validate guard', async () => {
    const value = jest.spyOn(Reflector.prototype,'get').mockReturnValue( ['admin'])
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: ()=>({
        getRequest: () => ({
          user: {roles:[ValidRoles.admin,ValidRoles.user]}
        })
      })
    });
    expect(await userRoleGuard.canActivate(mockExecutionContext)).toBeTruthy();
  });
  it('should validate no length roles', async () => {
    const value = jest.spyOn(Reflector.prototype,'get').mockReturnValue( [])
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: ()=>({
        getRequest: () => ({
          user: {roles:[ValidRoles.admin,ValidRoles.user]}
        })
      })
    });
    expect(await userRoleGuard.canActivate(mockExecutionContext)).toBeTruthy();
  });
  it('should validate no roles', async () => {
    const value = jest.spyOn(Reflector.prototype,'get').mockReturnValue( false)
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: ()=>({
        getRequest: () => ({
          user: {roles:[ValidRoles.admin,ValidRoles.user]}
        })
      })
    });
    expect(await userRoleGuard.canActivate(mockExecutionContext)).toBeTruthy();
  });
  it('should validate no user', async () => {
    const value = jest.spyOn(Reflector.prototype,'get').mockReturnValue([ValidRoles.user])
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: ()=>({
        getRequest: () => ({
          nouser: {}
        })
      })
    });
    try {
      await userRoleGuard.canActivate(mockExecutionContext);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
  it('should validate no authorized', async () => {
    const value = jest.spyOn(Reflector.prototype,'get').mockReturnValue(['admin'])
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: ()=>({
        getRequest: () => ({
          user: {roles:['user']}
        })
      })
    });
    try {
      userRoleGuard.canActivate(mockExecutionContext)
    } catch (error) {
      expect(error).toBeInstanceOf(ForbiddenException);
    }
  });
});
