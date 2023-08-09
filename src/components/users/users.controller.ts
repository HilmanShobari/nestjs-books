import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ethers } from 'ethers';
import { abi } from '../../../abis/abi';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      // Generate a new wallet
      const newWallet = ethers.Wallet.createRandom();
      const newMnemonic = newWallet.mnemonic.phrase;
      const newWalletAddress = newWallet.address;
      const newPrivateKey = newWallet.privateKey;

      //store to smart contract
      const privateKey = process.env.PRIVATE_KEY;
      const rpc = process.env.POLYGON_RPC;
      const provider = new ethers.providers.JsonRpcProvider(rpc);
      const signer = new ethers.Wallet(privateKey, provider);

      const contractAddress = '0x26FF3BdDc809182FddD703fC558fC03159Bf618B';

      const contract = new ethers.Contract(contractAddress, abi, signer);

      // interaction to contract
      // const owner = await contract.owner();
      const tx = await contract.register(
        newUser.name,
        newUser.email,
        newUser.role,
        newUser.uid,
        newWalletAddress,
      );

      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        userData: newUser,
        // mnemonic: newMnemonic,
        walletAddress: newWalletAddress,
        // privateKey: newPrivateKey,
        txHash: tx.hash,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    let user = await this.usersService.findOne(+id);
    if (user) return res.status(HttpStatus.OK).json(user);
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'This resource no longer exists or has been removed' });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const response = await this.usersService.update(+id, updateUserDto);
    if (response)
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User information updated successfully' });
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ error: 'The resource to be updated no longer exists' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.remove(+id);
    res
      .status(HttpStatus.OK)
      .json({ message: 'User details deleted successfully' });
  }
}
