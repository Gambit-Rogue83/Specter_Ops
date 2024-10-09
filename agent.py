
class Agent:

    def __init__(self, name, health=6, movement=4, portrait_img= '', mini_icon=''):
        self.name = name
        self.health = health
        self.movement = movement
        self.portrait_img = portrait_img
        self.mini_icon = mini_icon
        self.position = None
        self.equipment = []

    def move(self, new_position):
        """Move the agent to a new position on the board"""
        self.position = new_position
        print(f"{self.name} moves to {self.position}")

    def take_damage(self, damage):
        """Reduce the agent's health by the given damage"""
        self.health -= damage
        if self.health <= 0:
            print(f"{self.name} has been defeated!")
        else:
            print(f"{self.name} now has {self.health} health left.")

    def equip_item(self, item):
        """Add equipment to the agent's inventory."""
        self.equipment.append(item)

    def activate_equipment(self, item_name):
        """Activate the equipment by name."""
        for item in self.equipment:
            if item.name == item_name and item.is_active:
                item.activate()
                return
    #     else:
    #         print(f"{self.name} does not have {equipment_name} equipped.")

    def special_action(self):
        """Placeholder for special actions, overridden by subclasses."""
        raise NotImplementedError("This method should be overridden by subclasses")

    def is_within_range(self, target_position, range_limit):
        """Check if target is within range"""
        target_x, target_y = self.convert_position(target_position)
        self_x, self_y = self.convert_position(self.position)
        distance = abs(self_x - target_x) + abs(self_y - target_y)
        return distance <= range_limit

    def convert_position(self, position):
        """Convert board position into numerical coordinates"""
        letter = position[0].upper()
        number = int(position[1:])
        x = ord(letter) - ord('A')  # Convert A to 0, B to 1, etc
        y = number - 1
        return x, y



class Cobra(Agent):

    def __init__(self, portrait_img='', mini_icon=''):
        super().__init__(name="Cobra", portrait_img='static/cobra.jpg', mini_icon='static/cobra_head.png')

    def special_action(self, hunter_position, adjacent=False):
        """Ambush: Stun hunters in specific situations."""
        if self.position == hunter_position:
            print(f"{self.name} ambushes! The hunter is stunned and cannot attack.")
        elif adjacent and self.is_within_range(hunter_position, 1):
            roll = self.roll_die()
            if roll >= 4:
                print(f"{self.name} rolls a {roll}. The hunter is stunned and cannot attack.")
            else:
                print(f"{self.name} rolls a {roll}. No effect.")

    def roll_die(self):
        """Simulate a die roll (1 to 6)"""
        import random
        return random.randint(1, 6)


class Bluejay(Agent):

    def __init__(self, portrait_img='', mini_icon=''):
        super().__init__(name="Bluejay", portrait_img='static/bluejay.jpg', mini_icon='static/bluejay_head.png')

    def special_action(self, objective_position):
        """Frequency Hack: Complete mission objectives up to 2 spaces away."""
        if self.is_within_range(objective_position, 2):
            print(f"{self.name} uses Frequency Hack to complete the objective from {objective_position}.")


class Orangutan(Agent):

    def __init__(self, health=6, portrait_img='', mini_icon=''):
        super().__init__(name="Orangutan", health=8, portrait_img='static/orangutan.jpg', mini_icon='static/orangutan_head.png')



class Spider(Agent):

    def __init__(self, portrait_img='', mini_icon=''):
        super().__init__(name="Spider", portrait_img='static/spider.jpg', mini_icon='static/spider_head.png')

    def special_action(self, hunter_position):
        """Evasion: Hunters get -2 to their attack rolls when within 3 spaces of Spider."""
        if self.is_within_range(hunter_position, 3):
            print(f"{self.name}'s Evasion reduces the hunter's attack roll by -2.")

