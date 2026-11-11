import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { SzabalyDto } from './szabalydto.dto.js';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get("hibatabla")
  @Render("hibatabla")
  async hibak(){
    const hibak = await this.appService.getSzabalyok()
    return{hibak}
  }

  @Get("ujhiba")
  @Render("ujhiba")
  async ujHibaForm(){
   
  }


  @Post("ujhiba")
  @Render("ujhiba")
  async UjHiba(@Body() body:SzabalyDto){
    const priority = Number(body.priority)
    const mac = body.mac
    const enabled = body.enabled === "true"

    const macREGEX =/^([0-9a-fA-F]{2}:){5}[0-9a-fA-F]{2}$/;

    if(!macREGEX.test(body.mac)){
      return{
        error: "Hibás maccím"
      }
    }
  
    const hiba = await this.appService.UJSZabaly(priority, mac, enabled)

    return{
      error:"",
      hiba,
    }
  
  
  
  
  }





}
