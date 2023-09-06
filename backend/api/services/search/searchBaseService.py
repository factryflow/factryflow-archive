from abc import ABC, abstractmethod


class SearchBaseService(ABC):

    @abstractmethod
    def get_all_search_list(self):
        """ Abstract method to get all search list """
        pass
