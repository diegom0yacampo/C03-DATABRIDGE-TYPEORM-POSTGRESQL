import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly service: PlaylistsService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Playlist> {
    return this.service.findOne(id);
  }
}
