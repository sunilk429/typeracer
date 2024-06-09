"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const SwitchMode = () => {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const createGame = () => {
    const inviteCode = uuidv4();
    router.push(`/game/${inviteCode}`);
  };
  const joinGame = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const inviteCode = formData.get("inviteCode") as string;
    if (!inviteCode) return;
    router.push(`/game/${inviteCode}`);
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-3/4">
      <Tabs defaultValue="join" className="w-full">
        <TabsList className="w-full gap-4">
          <TabsTrigger value="create">Create Game</TabsTrigger>
          <TabsTrigger value="join">Join Game</TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <div className="flex flex-col gap-2">
            <Button onClick={createGame}>Create</Button>
          </div>
        </TabsContent>
        <TabsContent value="join">
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              name=""
              id=""
              placeholder="Enter invite code"
              className="p-2"
              ref={inputRef}
            />
            <Button onClick={joinGame}>Join</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwitchMode;
