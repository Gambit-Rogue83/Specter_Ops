
class Equipment:

    def __init__(self, name, uses, description):
        self.name = name
        self.uses = uses
        self.description = description
        self.is_active = True

    def use(self):
        if self.uses > 0:
            self.uses -= 1
            if self.uses == 0:
                self.is_active = False
        else:
            print(f"{self.name} has no uses left.")

    def activate(self):
        raise NotImplementedError("Each item needs its own activation logic.")


class PowerFists(Equipment):
    def __init__(self):
        super().__init__(name='fists', uses=2,
                         description='Location is revealed. All hunters within 2 spaces of Orangutan are stunned.')

    def activate(self):
        if self.uses > 0:
            print("Power Fists activated! Stunning all hunters within 2 spaces.")
            self.use()  # Decrease the number of uses
            # Add additional game logic for stunning hunters here
        else:
            print("Power Fists have no uses left.")


class VelocityBlade(Equipment):
    def __init__(self):
        super().__init__(name='blade', uses=2,
                         description='Activate during an attack. Hunters get -3 to their attack rolls.')

    def activate(self):
        if self.uses > 0:
            print("Velocity Blade activated! Hunters get -3 to attack rolls.")
            self.use()  # Decrease the number of uses
            # Add additional logic to modify hunter attack rolls here
        else:
            print("Velocity Blade has no uses left.")


class HoloDecoy(Equipment):
    def __init__(self):
        super().__init__(name='decoy', uses=1,
                         description='Your last seen location is spoofed, 4 spaces from your location.')

    def activate(self):
        if self.uses > 0:
            print("Holo Decoy activated! Your last seen location is spoofed.")
            self.use()  # Decrease the number of uses
            # Add logic to mark the spoofed location on the movement track
        else:
            print("Holo Decoy has no uses left.")


class TangleLine(Equipment):
    def __init__(self):
        super().__init__(name='tangle', uses=2,
                         description='Reveal location. Choose hunter in line of sight and roll 1 die. If roll equals or higher than distance'
                                     'that hunter is stunned')

    def activate(self):
        if self.uses > 0:
            print("Tangle Line has stunned the hunter.")
            self.use()  # Decrease the number of uses
            # Add additional game logic for stunning hunters here
        else:
            print("Tangle Line have no uses left.")


class SmokeGrenade(Equipment):
    def __init__(self):
        super().__init__(name='smoke', uses=1,
                         description='Activate during an attack. Hunters get -3 to their attack rolls.')

    def activate(self):
        if self.uses > 0:
            print("Smoke Grenade activated! Hunters get -3 to attack rolls.")
            self.use()  # Decrease the number of uses
            # Add additional logic to modify hunter attack rolls here
        else:
            print("Smoke Grenade has no uses left.")


class AdrenalSurge(Equipment):
    def __init__(self):
        super().__init__(name='surge', uses=1,
                         description='Your last seen location is spoofed, 4 spaces from your location.')

    def activate(self):
        if self.uses > 0:
            print("Adrenal Surge activated! Your last seen location is spoofed.")
            self.use()  # Decrease the number of uses
            # Add logic to mark the spoofed location on the movement track
        else:
            print("Adrenal Surge has no uses left.")


class FlashBang(Equipment):
    def __init__(self):
        super().__init__(name='flash', uses=1,
                         description='Activate during an attack. Hunters get -3 to their attack rolls.')

    def activate(self):
        if self.uses > 0:
            print("Flash Bang activated! Hunters get -3 to attack rolls.")
            self.use()  # Decrease the number of uses
            # Add additional logic to modify hunter attack rolls here
        else:
            print("Flash Bang has no uses left.")


class StealthField(Equipment):
    def __init__(self):
        super().__init__(name='stealth', uses=1,
                         description='Your last seen location is spoofed, 4 spaces from your location.')

    def activate(self):
        if self.uses > 0:
            print("Stealth Field activated! Your last seen location is spoofed.")
            self.use()  # Decrease the number of uses
            # Add logic to mark the spoofed location on the movement track
        else:
            print("Stealth Field has no uses left.")