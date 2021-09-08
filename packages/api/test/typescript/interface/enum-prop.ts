enum StringEnums {
  Up = 'UP',
}
export interface InterfaceWithEnumConstant {
  /**
   * kind is an enum constant
   */
  kind: StringEnums.Up;
  /**
   * radius property
   */
  radius: number;
}
