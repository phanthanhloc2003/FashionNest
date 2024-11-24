import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres', // Sử dụng PostgreSQL
        host: 'localhost', // Địa chỉ máy chủ PostgreSQL
        port: 5432, // Cổng mặc định của PostgreSQL
        username: 'postgres', // Tên người dùng PostgreSQL
        password: 'Ptl2003', // Mật khẩu
        database: 'postgres', // Tên cơ sở dữ liệu
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Đường dẫn tới các entity
        synchronize: true, // Đồng bộ schema, chỉ dùng trong development
      });
      return dataSource.initialize(); // Khởi tạo kết nối
    },
  },
];
