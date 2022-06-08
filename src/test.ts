// import 'reflect-metadata';

// function Injectable(key: string) {
//     const metaValue: number = 1;
//     return (target: Function) => {
//         Reflect.defineMetadata(key, metaValue, target);//связывание объекта target с ключем по которому затем можно обратиться к этому объекту во время выполнения
//     }
// }

// function Inject(key: string){
//     return (target: Function) => {
//         Reflect.getMetadata(key, target);
//     }
// }

// function Prop(target: Object, name: string) { }

// @Injectable('C')
// export class C {
//     @Prop prop: number;
// }

// export class D {
//     constructor(@Inject('C') c: C) { }
// }
