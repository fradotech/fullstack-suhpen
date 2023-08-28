export declare type Exactly<ParentType, ChildType> = ParentType & {
  [ChildProperty in keyof ChildType]: ChildProperty extends keyof ParentType
    ? ParentType[ChildProperty]
    : never
}
