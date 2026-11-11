import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Szabalyok } from './szabaly.js';


const mysqlConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "blocklist"
})


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async getSzabalyok() {
    const [result] = await mysqlConnection.execute(
      'SELECT id, priority, mac, enabled FROM blocklist ORDER BY priority'
    );
    const rows = result as Szabalyok[];
    return rows;

  }


  async UJSZabaly(priority: number, mac: string, enabled: boolean) {
    const [result] = await mysqlConnection.execute(
      'INSERT INTO blocklist(priority, mac, enabled) values(?,?,?)',
      [priority, mac, enabled]
    );
    const rows = result as any;
    return{
      id: rows.insertId,
      priority, mac, enabled
    }as Szabalyok
  }











}
